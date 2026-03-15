import { Component } from '@angular/core';
import { NavadminSmartComponent } from '../../core/navadmin/navadmin.smart.component';
import { EvenementDto } from '../../dto/evenement-dto';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EvenementService } from '../../service/evenement-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-agenda',
  imports: [NavadminSmartComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-agenda.page.component.html',
  styleUrl: './admin-agenda.page.component.css',
})
export class AdminAgendaPageComponent {

  protected evenement: EvenementDto = new EvenementDto(0, "", "", 0, "", new Date());
  protected evenement$!: Observable<EvenementDto[]>;
  protected evenementForm!: FormGroup;
  protected villeCtrl!: FormControl;
  protected lieuCtrl!: FormControl;
  protected cpControl!: FormControl;
  protected libelleControl!: FormControl;
  protected dateCtrl!: FormControl;

  
  protected editingEvenement!: EvenementDto | null;

  constructor(private evenementService: EvenementService, private formBuilder: FormBuilder) { }

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
  }

  public ajouterModifierMap() {

    if (this.editingEvenement) {
      this.evenementService.save(new EvenementDto(
        this.editingEvenement.id,
        this.villeCtrl.value,
        this.lieuCtrl.value,
        this.cpControl.value,
        this.libelleControl.value,
        this.dateCtrl.value
      ));
    }

    else {
      this.evenementService.save(new EvenementDto(
        0, 
        this.villeCtrl.value,
        this.lieuCtrl.value,
        this.cpControl.value,
        this.libelleControl.value,
        this.dateCtrl.value
      ));
    }
    console.log(this.evenementForm.value);

    this.editingEvenement = null;
    this.evenementForm.reset();
  }

  public editEvenement(evenement: EvenementDto): void {
    // Clone du Map pour l'édition
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

  public trackEvenement(index: number, value: EvenementDto) {
    return value.id;
  }
}
