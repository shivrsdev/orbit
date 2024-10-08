// /src/views/post.tsx
// Creating post view

import axios from "axios";
import { Dispatch, StateUpdater, useState } from "preact/hooks";

export function Post(props: { token: string, setView: Dispatch<StateUpdater<string>> }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const post = async (event: Event) => {
        event.preventDefault();

        try {
            await axios.post('/api/posts', {
                title: title,
                content: content
            }, {
                headers: {
                    'Authorization': props.token
                }
            });

            props.setView('HOME');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center;">
            <header>
                <h1 style="color: #00B478; padding: 20px;">orbit</h1>
            </header>
            <main>
                <form onSubmit={post}>
                    <input type="text" name="title" placeholder="Title" onChange={event => setTitle(event.currentTarget.value)} />
                    <input type="text" name="content" placeholder="Content" onChange={event => setContent(event.currentTarget.value)} />
                    <input type="submit" value="Post" />
                </form>
            </main>
        </div>
    );
}