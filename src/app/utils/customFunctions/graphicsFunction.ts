import { ProjectsByMonthResponse } from "../responses-interfaces/proyectsByMonth";

export function projectsByYear(pbm: ProjectsByMonthResponse[]): Array<number>{

  if(!pbm ){
    return new Array(12).fill(0);
  }

  const projectsByMonth: Array<number> = new Array(12).fill(0);
  for(let i=0; i<pbm.length; i++){
    projectsByMonth[pbm[i].mes-1] = pbm[i].proyectos;

  }
  return projectsByMonth;

}
