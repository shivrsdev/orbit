<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Orbit</h1>

<h2>Overview</h2>
<p>Full stack social media app with the ability to login and sign up and create and view posts</p>

<h2>Directory Structure</h2>
<pre>
orbit/
├── server/
├── client/
</pre>

<h2>Prerequisites</h2>
<p>Make sure you have <a href="https://bun.sh">Bun</a> installed on your machine.</p>

<h2>Getting Started</h2>

<h3>Server Setup</h3>
<ol>
    <li><strong>Navigate to the Server Directory:</strong>
        <pre><code>cd server</code></pre>
    </li>
    <li><strong>Install Dependencies:</strong>
        <pre><code>bun install</code></pre>
    </li>
    <li><strong>Run Database Migrations:</strong>
        <p>Run the following command to create your database migrations. You can use <code>init</code> or <code>main</code> as the migration name.</p>
        <pre><code>bun prisma migrate dev --name &lt;your-migration-name&gt;</code></pre>
        <p>Replace <code>&lt;your-migration-name&gt;</code> with either <code>init</code> or <code>main</code>.</p>
    </li>
    <li><strong>Start the Server:</strong>
        <p>For development:</p>
        <pre><code>bun dev</code></pre>
        <p>For production:</p>
        <pre><code>bun start</code></pre>
    </li>
</ol>

<h3>Client Setup</h3>
<ol>
    <li><strong>Navigate to the Client Directory:</strong>
        <pre><code>cd ../client</code></pre>
    </li>
    <li><strong>Install Dependencies:</strong>
        <pre><code>bun install</code></pre>
    </li>
    <li><strong>Run the Client:</strong>
        <p>For development:</p>
        <pre><code>bun dev</code></pre>
    </li>
    <li><strong>Build the Executable:</strong>
        <p>When you're ready to create a production build:</p>
        <pre><code>bun build</code></pre>
    </li>
</ol>

</body>
</html>
