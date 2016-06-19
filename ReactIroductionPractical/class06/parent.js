//两层及以上的传递
// 1. props 属性值提倡显式传递到下一级


// 子组件
var Child = React.createClass({
	render: function(){
		return(
			<div>
				<span>Hello {this.props.fullName}.</span>
			</div>
		)
	}
});


// 父组件
var Parent = React.createClass({
	//添加姓
	addFamilyName: function(name){
		return name + ' Jobs';
	},

  render: function() {
    return (
      <Child fullName={this.addFamilyName(this.props.name)} name={this.props.name} />
    );
  }
});

ReactDOM.render(
  <Parent name="Steven"/>,
  document.getElementById('example')
);