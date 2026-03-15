import { Component } from '@angular/core';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { PartitionDto } from '../../dto/partition-dto';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PartitionService } from '../../service/PartitionService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-scores',
  imports: [NavadminSmartComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-scores.page.component.html',
  styleUrl: './admin-scores.page.component.css',
})
export class AdminScoresPageComponent {

  protected partition$!: Observable<PartitionDto[]>;
  protected partitionForm!: FormGroup;

  protected auteurCtrl!: FormControl;
  protected titreCtrl!: FormControl;

  protected editingPartition: PartitionDto | null = null;
  protected selectedFile: File | null = null;

  constructor(
    private partitionService: PartitionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.partition$ = this.partitionService.findAll();

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

  public ajouterModifierMap(): void {
    if (this.editingPartition) {
      const updatedPartition = new PartitionDto(
        this.editingPartition.id,
        this.titreCtrl.value,
        this.auteurCtrl.value,
        this.editingPartition.pdfPath,
        this.editingPartition.pdfName,
        this.editingPartition.dateCreation
      );

      this.partitionService.update(updatedPartition);
    } else {
      if (!this.selectedFile) {
        alert('Veuillez sélectionner un fichier PDF.');
        return;
      }

      this.partitionService.create(
        this.titreCtrl.value,
        this.auteurCtrl.value,
        this.selectedFile
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
    this.partitionService.deleteById(partition.id);
  }

  public downloadPartition(partition: PartitionDto): void {
    window.open(this.partitionService.getDownloadUrl(partition.id), '_blank');
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
    this.partitionForm.reset();
  }
}
