import { Form, Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Film, getFilms } from "~/api/film";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get('title');
    return getFilms(title);
}

export const meta: MetaFunction = () => {
    return { title: 'Films | Studio Ghibli', description: 'Films Page'}
}

export default function FilmsIndex() {
    const films = useLoaderData<Film[]>();
    return (
      <div className="p-16 font-sans">
        <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>
        {/* Remix recommends to use Form component */}
        <Form reloadDocument className="py-5">
            <label className="font-bold">
                Search{' '}
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Type a title ..."
                    className="border-2 rounded py-2 px-3"
                />
            </label>
            <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" >
                Search
            </button>
        </Form>
        <div className="grid grid-cols-4 gap-4">
            {films.map((film: Film) => (
            <Link 
                title={film.id} 
                to={film.id} 
                key={film.id} 
                className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
                prefetch="intent">
                {/* prefetch:intent is a way Remix has to prefetch data when it thinks user 
                is gonna click the link before they click it*/}
                <div>{film.title}</div>
                <img src={film.image} />
            </Link>))}
        </div>
      </div>
    );
  }
  