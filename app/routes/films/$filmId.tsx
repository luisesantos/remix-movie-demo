import { ActionFunction, LoaderFunction, Outlet, useLoaderData, redirect } from "remix";
import invariant from "tiny-invariant";
import { addComment } from "~/api/comments";
import { Film, getFilm } from "~/api/film";
import CharacterList from "~/components/CharacterList";
import CommentsList from "~/components/CommentsList";
import FilmBanner from "~/components/FilmBanner";

export const action: ActionFunction = async ({request, params}) => {
    invariant(params.filmId, "expected params.filmId");

    const body = await request.formData();

    const comment = {
        name: body.get('name') as string,
        message: body.get('message') as string,
        filmId: params.filmId,
    }
    const errors = {name: "", message: ""};
    if(!comment.name){
        errors.name = "Please provide a name";
    }
    if(!comment.message){
        errors.message = "Please provide a message";
    }
    if(errors.name || errors.message){
        const values = Object.fromEntries(body);
        return {errors, values}
    }
    await addComment(comment);
    return redirect(`/films/${params.filmId}`)
}

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.filmId, "Expected parameter.filmId")
    const film = await getFilm(params.filmId);

    return film;
}

export default function Film() {
    const film = useLoaderData<Film>();
    return <div>
        <FilmBanner film={film} />
        <div className="p-10">
            <p>{film.description}</p>
            <div className="flex py-5 space-x-5">
                <CharacterList characters={film.characters} />
                <div className="flex-1 flex flex-col justify-between">
                    <Outlet />
                    <CommentsList filmId={film.id} comments={film.comments || []} />
                </div>
            </div>
        </div>
    </div>;
}