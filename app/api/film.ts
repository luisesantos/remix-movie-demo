import { CommentEntry, getComments } from "./comments";

export type Film = {
    id: string;
    title: string;
    original_title: string;
    description: string;
    image: string;
    movie_banner: string;
    people: string[];
    characters?: FilmCharacter[];
    comments?: CommentEntry[];
}

export type FilmCharacter = {
    id: string;
    name: string;
    gender?: string;
    age?: string;
    eye_color?: string;
    hair_color?: string;
}

export async function getFilms(title?: string | null): Promise<Film[]>{
    const response = await fetch('https://ghibliapi.herokuapp.com/films');
    const films: Film[] = await response.json(); 
    
    if(!title) return films;

    return films.filter((film) => film.title.toLowerCase().includes(title.toLowerCase()));
}

export async function getFilm(filmId: string){
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`);
    const film: Film = await response.json(); 
    
    // Maybe we can show characters in a nested route ?
    const characters: FilmCharacter[] = await Promise.all(
        film.people
            .filter((url: string) => url !== "https://ghibliapi.herokuapp.com/people/" )
            .map((url: string) => fetch(url).then((res) => res.json()))
    )

    const comments = await getComments(filmId);
    console.log("########## GET #######", comments);
    return { ...film, characters, comments };
}

export async function getFilmCharacter(characterId:string): Promise<FilmCharacter>{
    const response = await fetch(`https://ghibliapi.herokuapp.com/people/${characterId}`);
    if(!response.ok){
        throw response;
    }

    return response.json();
}