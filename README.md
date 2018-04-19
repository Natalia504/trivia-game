## React Webpack Setup
#### Webpack & Babel
To duplicate a repository without forking it, you can run a special clone command, then mirror-push to the new repository.
1. Create a [new-repo] on GitHub.
2. Create a bare clone of this repository: `git clone --bare https://github.com/Natalia504/react-webpack-template.git`. 
3. Mirror-push to the new repository: `cd react-webpack-template` 
`git push --mirror https://github.com/user/[new-repo].git`
4. Remove the temporary local repository you created in step 2: `rm -rf old-repository.git`.
5. Install dependencies: `npm i`