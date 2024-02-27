import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { AuthorService, AuthorDto, CreateAuthorDto, UpdateAuthorDto } from '@proxy/authors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AuthorComponent implements OnInit {
  author = { items: [], totalCount: 0 } as PagedResultDto<AuthorDto>;

  isModalOpen = false;

  form: FormGroup;

  selectedAuthor = {} as AuthorDto;
  photoFile: File | null = null;
  constructor(
    public readonly list: ListService,
    private authorService: AuthorService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    const authorStreamCreator = (query) => this.authorService.getList(query);

    this.list.hookToQuery(authorStreamCreator).subscribe((response) => {
      this.author = response;
    });
  }

  createAuthor() {
    this.selectedAuthor = {} as AuthorDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editAuthor(id: string) {
    this.authorService.get(id).subscribe((author) => {
      this.selectedAuthor = author;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedAuthor.name || '', Validators.required],
      shortBio: [this.selectedAuthor.shortBio],
      birthDate: [
        this.selectedAuthor.birthDate ? new Date(this.selectedAuthor.birthDate) : null,
        Validators.required,
      ],
    });
  }

  async save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedAuthor.id) {
      const updateAuthorDto: UpdateAuthorDto = {
        name: this.form.value.name,
        birthDate: this.form.value.birthDate,
        shortBio: this.form.value.shortBio,
        image: this.photoFile ? await this.convertImageToBase64(this.photoFile) : null
      };

      this.authorService
        .update(this.selectedAuthor.id, updateAuthorDto)
        .subscribe(() => {
          this.isModalOpen = false;
          this.form.reset();
          this.list.get();
        });
    } else {
      const createAuthorDto: CreateAuthorDto = {
        name: this.form.value.name,
        birthDate: this.form.value.birthDate,
        shortBio: this.form.value.shortBio,
        image: this.photoFile ? await this.convertImageToBase64(this.photoFile) : null
      };
      this.authorService.create(createAuthorDto).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    }

    
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure')
        .subscribe((status) => {
          if (status === Confirmation.Status.confirm) {
            this.authorService.delete(id).subscribe(() => this.list.get());
          }
	    });
  }

  async convertImageToBase64(image: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(image);
    });
  }
  onPhotoChange(event: any) {
    if (event.target.files.length > 0) {
     console.log("photo passed");
      this.photoFile = event.target.files[0] as File;
    }
  }
}
