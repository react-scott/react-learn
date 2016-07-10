###二、嵌套路由

Route组件还可以嵌套。
```
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```

上面代码中，用户访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件。
```
<App>
  <Repos/>
</App>
```

App组件要写成下面的样子。

```
export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})
```

上面代码中，App组件的this.props.children属性就是子组件。

子路由也可以不写在Router组件里面，单独传入Router组件的routes属性。
```
let routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>
```
