# Setting up the Project

First you'll need [Node.js](https://nodejs.org) and the package manager
that comes with it: [npm](https://www.npmjs.com/).

Once you've got that working, head to the command line where we'll set
up our project.

## Clone the Tutorial

```
git clone https://github.com/reactjs/react-router-tutorial
cd react-router-tutorial
cd lessons/01-setting-up
npm install
npm start
```

Now open up [http://localhost:8080](http://localhost:8080)

Feel free to poke around the code to see how we're using webpack and npm
scripts to run the app.

You should see a "Hello React Router" message in the browser.

## Make Some Changes

Open up `modules/App.js` and change the text to something like "Hello
<your name>". The browser automatically reloads with your new code.

---

[Next: Rendering a Router](../02-rendering-a-route/)


------------------------------------------------------------------------

一、基本用法

React Router 安装命令如下。
```
$ npm install -S react-router
```

使用时，路由器Router就是React的一个组件。

```
import { Router } from 'react-router';
render(<Router/>, document.getElementById('app'));
```

Router组件本身只是一个容器，真正的路由要通过Route组件定义。

```
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));
```

上面代码中，用户访问根路由/（比如http://www.example.com/），组件APP就会加载到document.getElementById('app')。
你可能还注意到，Router组件有一个参数history，它的值hashHistory表示，路由的切换由URL的hash变化决定，即URL的#部分发生变化。
举例来说，用户访问http://www.example.com/，实际会看到的是http://www.example.com/#/。

Route组件定义了URL路径与组件的对应关系。你可以同时使用多个Route组件。
```
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
```

上面代码中，用户访问/repos（比如http://localhost:8080/#/repos）时，加载Repos组件；
访问/about（http://localhost:8080/#/about）时，加载About组件。



