
// recibir desde el back
export interface JobsData {
    name: string;
    jobTitle: string;
    description: string;
    imageUrl: string;
    date:string;
    time:string;
    timelapse:string;
    user:string;
    profesion:string;
   
}

// enviar al back
export interface JobsPostData {
    title: string;
    description: string;
    profesion: string;
    imageUrl: string;
}

// actualizar datos 
export interface JobsUpdateData {
    title: string;
    description: string;
}

export type Jobs=JobsData[];

export interface FetchError {
    message: string
}

export interface JobsState {
    allJobs: Jobs,
    jobDetail: JobsData | null,
    loading: boolean,
    error: string | null 
}