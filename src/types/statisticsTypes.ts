export interface StatisticsData {
   month: string;
    totalValue: number;
    countPublications?: number;  // Añadir la propiedad countPublications como opcional
}


export interface MonthlyUsersCount {
    month: string,
    countUsers: number
}
  
export interface MonthlyPostsCount {
    month: string,
    countPublications: number
}
  
export interface WeeklyPostsCount {
    week: string,
    countPublications: number
}
  
export interface DailyPostsCount {
    day: string,
    countPublications: number
}