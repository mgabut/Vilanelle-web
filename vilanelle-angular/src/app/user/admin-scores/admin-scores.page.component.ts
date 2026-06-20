import { Component } from '@angular/core';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { PartitionDto } from '../../dto/partition-dto';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PartitionService } from '../../service/PartitionService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-scores',
  imports: [NavadminSmartComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './admin-scores.page.component.html',
  styleUrl: './admin-scores.page.component.css',
})
export class AdminScoresPageComponent {

  protected partition$!: Observable<PartitionDto[]>;
  protected filteredPartitions$!: Observable<PartitionDto[]>;
  protected partitionForm!: FormGroup;

  protected searchQuery = '';
  private searchSubject = new BehaviorSubject<string>('');

  protected auteurCtrl!: FormControl;
  protected titreCtrl!: FormControl;

  protected editingPartition: PartitionDto | null = null;
  protected selectedFile: File | null = null;
  protected selectedAudioFile: File | null = null;

  constructor(
    private partitionService: PartitionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.partition$ = this.partitionService.findAll();
    this.filteredPartitions$ = combineLatest([this.partition$, this.searchSubject]).pipe(
      map(([partitions, query]) => {
        const q = query.trim().toLowerCase();
        return q ? partitions.filter(p =>
          p.titre?.toLowerCase().includes(q) || p.pdfName?.toLowerCase().includes(q)
        ) : partitions;
      })
    );

    this.auteurCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    this.titreCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

    this.partitionForm = this.formBuilder.group({
      auteur: this.auteurCtrl,
      titre: this.titreCtrl
    });
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  public onAudioSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedAudioFile = input.files[0];
  }
}

  public ajouterModifierMap(): void {
  if (this.editingPartition) {
    this.partitionService.updateWithFile(
      this.editingPartition.id,
      this.titreCtrl.value,
      this.auteurCtrl.value,
      this.selectedFile,
      this.selectedAudioFile
    );
  } else {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier PDF.');
      return;
    }

    this.partitionService.create(
      this.titreCtrl.value,
      this.auteurCtrl.value,
      this.selectedFile,
      this.selectedAudioFile
    );
  }

  this.resetForm();
}

  public editPartition(partition: PartitionDto): void {
    this.editingPartition = partition;
    this.auteurCtrl.setValue(partition.auteur);
    this.titreCtrl.setValue(partition.titre);
    this.selectedFile = null;
  }

  public deletePartition(partition: PartitionDto): void {
    if (!confirm(`Supprimer la partition "${partition.titre}" ? Cette action est irréversible.`)) return;
    this.partitionService.deleteById(partition.id);
  }

  public downloadPartition(partition: PartitionDto): void {
    this.partitionService.downloadById(partition.id).subscribe({
      next: (blob: Blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = partition.pdfName || 'partition.pdf';
        link.click();
        window.URL.revokeObjectURL(fileURL);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement :', error);
        alert('Impossible de télécharger la partition.');
      }
    });
  }

  public downloadAudio(partition: PartitionDto): void {
    this.partitionService.downloadAudioById(partition.id).subscribe({
      next: (blob: Blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = partition.audioName || 'audio.mp3';
        link.click();
        window.URL.revokeObjectURL(fileURL);
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement de l’audio :', error);
        alert('Impossible de télécharger le fichier audio.');
      }
    });
  }

  public onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  public cancelEdit(): void {
    this.resetForm();
  }

  public trackPartition(index: number, value: PartitionDto): number {
    return value.id;
  }

  private resetForm(): void {
    this.editingPartition = null;
    this.selectedFile = null;
    this.selectedAudioFile = null;
    this.partitionForm.reset();
  }
}
