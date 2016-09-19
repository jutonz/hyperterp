exports.decorateTerm = (Term, { React }) => {
  return class extends React.Component {

    constructor (props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
    }

    _onTerminal (term) {
      if (this.props && this.props.onTerminal) this.props.onTerminal(term);

      const handler = [
        "keydown",
        function(e) {
            // fix tilde
          if (e.altKey && e.keyCode === 80) {
            e.preventDefault();
            this.terminal.io.sendString("p\n");
          }
        }.bind(term.keyboard)
      ];

      term.uninstallKeyboard();
      term.keyboard.handlers_ = [handler].concat(term.keyboard.handlers_);
      term.installKeyboard();
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }));
    }

  };
};
