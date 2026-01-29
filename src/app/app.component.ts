import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LiveUpdate } from '@capawesome/capacitor-live-update';

import { Todo, TodoService } from './services/todo.service';

// Capawesome Live Update
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Change this to prove OTA updates (v1 -> v2 🔥)
  webBundleVersion = 'v1';
  activeTab: 'todos' | 'about' = 'todos';

  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(120)],
  });
  todos: Todo[] = [];

  checking = false;
  status = '';

  constructor(private todosSvc: TodoService) {}

  async ngOnInit() {
    this.todos = this.todosSvc.load();

    // Prevent rollback once the app is running okay
    try {
      await LiveUpdate.ready();
    } catch {}
  }

  add() {
    this.todos = this.todosSvc.add(this.todos, this.newTodo.value);
    this.todosSvc.save(this.todos);
    this.newTodo.setValue('');
  }

  edit(todo: Todo) {
    const next = prompt('Edit todo', todo.text);
    if (next == null) return;
    this.todos = this.todosSvc.update(this.todos, todo.id, next);
    this.todosSvc.save(this.todos);
  }

  delete(todo: Todo) {
    this.todos = this.todosSvc.remove(this.todos, todo.id);
    this.todosSvc.save(this.todos);
  }

  // === Live Updates demo button ===
  async checkNow() {
    this.checking = true;
    this.status = 'Checking for updates…';

    try {
      const res = await LiveUpdate.sync(); // downloads & sets next bundle if available
      if ((res as any)?.nextBundleId) {
        this.status = 'Update downloaded. Reloading…';
        await LiveUpdate.reload(); // apply immediately for the demo
        return;
      }
      this.status = 'No update available.';
    } catch (e: any) {
      this.status = `Update failed: ${e?.message ?? e}`;
    } finally {
      this.checking = false;
      setTimeout(() => (this.status = ''), 6000);
    }
  }
}
