/**
 * Mock server using json-server library
 */


export type CommentEntry = {
    name: string;
    filmId: string;
    message: string;
}

export async function getComments(filmId: string): Promise<CommentEntry>{
    const response = await fetch(`http://localhost:3001/comments?filmId=${filmId}`);
    return response.json();
}

export async function addComment(comment: CommentEntry){
    console.log("########### POST ##########", comment);
    const response = await fetch(`http://localhost:3001/comments`,{
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json();
}