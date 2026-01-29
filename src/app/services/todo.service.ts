import { Injectable } from '@angular/core';

export interface Todo {
  id: string;
  text: string;
}

const KEY = 'lifelistpro.todos';

function id() {
  return (
    (crypto as any)?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  load(): Todo[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  save(todos: Todo[]) {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }

  add(todos: Todo[], text: string): Todo[] {
    const t = text.trim();
    if (!t) return todos;
    return [{ id: id(), text: t }, ...todos];
  }

  update(todos: Todo[], todoId: string, text: string): Todo[] {
    const t = text.trim();
    if (!t) return todos;
    return todos.map((x) => (x.id === todoId ? { ...x, text: t } : x));
  }

  remove(todos: Todo[], todoId: string): Todo[] {
    return todos.filter((x) => x.id !== todoId);
  }
}
