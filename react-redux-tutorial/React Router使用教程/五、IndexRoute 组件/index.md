###五、IndexRoute 组件

下面的例子，你会不会觉得有一点问题？

```
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

上面代码中，访问根路径/，不会加载任何子组件。也就是说，App组件的this.props.children，这时是undefined。

因此，通常会采用{this.props.children || &lt;Home/>}这样的写法。

这时，Home明明是Accounts和Statements的同级组件，却没有写在Route中。

IndexRoute就是解决这个问题，显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。

你可以把IndexRoute想象成某个路径的index.html。
```
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

现在，用户访问/的时候，加载的组件结构如下。

```
<App>
  <Home/>
</App>
```

这种组件结构就很清晰了：App只包含下级组件的共有元素，本身的展示内容则由Home组件定义。

这样有利于代码分离，也有利于使用React Router提供的各种API。

注意，IndexRoute组件没有路径参数path。
