// 设定props的属性

var Hello = React.createClass({
  propTypes: {
  	// name: React.PropTypes.string
  	// type: React.PropTypes.oneOf(['News', 'Photos']),
  	// type: React.PropTypes.oneOfType([
   //    React.PropTypes.string,
   //    React.PropTypes.number,
   //  ]),
   // type: React.PropTypes.arrayOf(React.PropTypes.number),
   
   name: function(props, propName, componentName) {
      if (!/^W/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    }
  },

  render: function() {
    return (
      <div>
        <span>Hello {this.props.name}!</span>
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name='World' />,
  document.getElementById('example')
);



// http://facebook.github.io/react/docs/reusable-components.html