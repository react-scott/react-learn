###四、通配符

path属性可以使用通配符。

```
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

通配符的规则如下。
（1）:paramName
    :paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
（2）()
    ()表示URL的这个部分是可选的。
（3）*
    *匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
（4） **
    ** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。
    
path属性也可以使用相对路径（不以/开头），匹配时就会相对于父组件的路径，可以参考上一节的例子。

嵌套路由如果想摆脱这个规则，可以使用绝对路由。

路由匹配规则是从上到下执行，一旦发现匹配，就不再其余的规则了。
```
<Route path="/comments" ... />
<Route path="/comments" ... />
```

上面代码中，路径/comments同时匹配两个规则，第二个规则不会生效。
设置路径参数时，需要特别小心这一点。
```
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```

上面代码中，用户访问/about/me时，不会触发第二个路由规则，因为它会匹配/:userName/:id这个规则。

因此，带参数的路径一般要写在路由规则的底部。

此外，URL的查询字符串/foo?bar=baz，可以用this.props.location.query.bar获取。