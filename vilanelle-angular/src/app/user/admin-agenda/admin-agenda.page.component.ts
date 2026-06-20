import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { EvenementDto } from '../../dto/evenement-dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EvenementService } from '../../service/evenement-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfficheService } from '../../service/affiche.service';
import { Affiche } from '../../model/affiche';

@Component({
  selector: 'app-admin-agenda',
  imports: [NavadminSmartComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './admin-agenda.page.component.html',
  styleUrl: './admin-agenda.page.component.css',
})
export class AdminAgendaPageComponent implements OnInit {

  // --- Événements ---
  protected evenement: EvenementDto = new EvenementDto(0, "", "", 0, "", new Date());
  protected evenement$!: Observable<EvenementDto[]>;
  protected evenementForm!: FormGroup;
  protected villeCtrl!: FormControl;
  protected lieuCtrl!: FormControl;
  protected cpControl!: FormControl;
  protected libelleControl!: FormControl;
  protected dateCtrl!: FormControl;
  protected editingEvenement!: EvenementDto | null;

  // --- Affiches ---
  @ViewChild('afficheFileInput') afficheFileInput!: ElementRef<HTMLInputElement>;
  protected affiches: Affiche[] = [];
  protected newAffichePosition: number = 1;
  protected selectedAfficheFile: File | null = null;
  protected afficheUploading = false;
  protected afficheUploadError = '';

  constructor(
    private evenementService: EvenementService,
    private formBuilder: FormBuilder,
    public afficheService: AfficheService
  ) {}

  ngOnInit(): void {
    this.evenement$ = this.evenementService.findAll();

    this.villeCtrl = new FormControl('', Validators.required);
    this.lieuCtrl = new FormControl('', Validators.required);
    this.cpControl = new FormControl('', Validators.required);
    this.libelleControl = new FormControl('', Validators.required);
    this.dateCtrl = new FormControl('', Validators.required);

    this.evenementForm = this.formBuilder.group({
      ville: this.villeCtrl,
      lieu: this.lieuCtrl,
      cp: this.cpControl,
      libelle: this.libelleControl,
      date: this.dateCtrl
    });

    this.loadAffiches();
  }

  // --- Événements methods ---
  public ajouterModifierMap(): void {
    if (this.editingEvenement) {
      this.evenementService.save(new EvenementDto(
        this.editingEvenement.id,
        this.villeCtrl.value,
        this.lieuCtrl.value,
        this.cpControl.value,
        this.libelleControl.value,
        this.dateCtrl.value
      ));
    } else {
      this.evenementService.save(new EvenementDto(
        0,
        this.villeCtrl.value,
        this.lieuCtrl.value,
        this.cpControl.value,
        this.libelleControl.value,
        this.dateCtrl.value
      ));
    }
    this.editingEvenement = null;
    this.evenementForm.reset();
  }

  public editEvenement(evenement: EvenementDto): void {
    this.editingEvenement = evenement;
    this.villeCtrl.setValue(evenement.ville);
    this.lieuCtrl.setValue(evenement.lieu);
    this.cpControl.setValue(evenement.cp);
    this.libelleControl.setValue(evenement.libelle);
    this.dateCtrl.setValue(evenement.date);
  }

  public deleteEvenement(evenement: EvenementDto): void {
    this.evenementService.deleteById(evenement.id);
  }

  public trackEvenement(index: number, value: EvenementDto): number {
    return value.id;
  }

  // --- Affiches methods ---
  private loadAffiches(): void {
    this.afficheService.getAll().subscribe({
      next: (data) => {
        this.affiches = data;
        this.newAffichePosition = this.availablePositions()[0] ?? 1;
      },
      error: (err) => console.error('Erreur chargement affiches', err)
    });
  }

  public getAfficheAtPosition(position: number): Affiche | undefined {
    return this.affiches.find(a => a.position === position);
  }

  public availablePositions(): number[] {
    const used = this.affiches.map(a => a.position);
    return [1, 2, 3, 4].filter(p => !used.includes(p));
  }

  public onAfficheFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedAfficheFile = input.files?.[0] ?? null;
  }

  public uploadAffiche(): void {
    if (!this.selectedAfficheFile) return;
    this.afficheUploading = true;
    this.afficheUploadError = '';

    this.afficheService.upload(this.selectedAfficheFile, this.newAffichePosition).subscribe({
      next: () => {
        this.selectedAfficheFile = null;
        this.afficheFileInput.nativeElement.value = '';
        this.afficheUploading = false;
        this.loadAffiches();
      },
      error: () => {
        this.afficheUploadError = "Erreur lors de l'envoi de l'affiche.";
        this.afficheUploading = false;
      }
    });
  }

  public deleteAffiche(id: number): void {
    this.afficheService.delete(id).subscribe({
      next: () => this.loadAffiches(),
      error: (err) => console.error('Erreur suppression affiche', err)
    });
  }
}
