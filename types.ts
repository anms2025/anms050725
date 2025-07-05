
export enum Screen {
    Home = 'HOME',
    Chat = 'CHAT',
    Summarizer = 'SUMMARIZER',
    Jurisprudence = 'JURISPRUDENCE',
    DocumentAssistant = 'DOCUMENT_ASSISTANT',
    Agenda = 'AGENDA',
    Profile = 'PROFILE'
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface JurisprudenceCase {
    id: number;
    title: string;
    court: string;
    topic: string;
    date: string;
}

export type AgendaPeriod = 'Hoy' | 'Mañana' | 'Próximamente';

export interface AgendaEvent {
    id: number;
    title: string;
    date: string;
}