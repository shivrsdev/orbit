// /src/main.tsx
// Entry point

import { render } from 'preact'
import { Context } from './context';
import { Login } from './components/login';
import { Home } from './components/home';
import { CreatePost } from './components/createPost';
import { Post } from './components/post';

function App() {
    const context = new Context();

    return(
        context.page === 'LOGIN' ? <Login context={context} />
        : context.page === 'HOME' ? <Home context={context} />
        : context.page === 'CREATE_POST' ? <CreatePost context={context} />
        : context.page === 'POST' ? <Post context={context} />
        : <h1>{context.page} doesn't exist.</h1>
    )
}

render(<App />, document.getElementById('app')!)