import React from 'react';

export default class Store extends React.Component {
  static mounted = false;

  componentDidMount() {
    if (Store.mounted) {
      throw new Error(`Kan een store maar 1x mounten`);
    }
    Store.mounted = true;
  }

  componentWillUnmount() {
    Store.mounted = false;
  }
}
