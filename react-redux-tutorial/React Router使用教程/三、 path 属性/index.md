###三、 path 属性

Route组件的path属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。

请看下面的例子。
```
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
```

上面代码中，当用户访问/inbox/messages/:id时，会加载下面的组件。
```
<Inbox>
  <Message/>
</Inbox>
```

如果省略外层Route的path参数，写成下面的样子。
```
<Route component={Inbox}>
  <Route path="inbox/messages/:id" component={Message} />
</Route>
```

现在用户访问/inbox/messages/:id时，组件加载还是原来的样子。
```
<Inbox>
  <Message/>
</Inbox>
```
