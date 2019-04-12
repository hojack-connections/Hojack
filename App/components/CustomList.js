import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Observer } from 'mobx-react/native'

export default
@observer
class CustomList extends React.Component {
  render() {
    return (
      <ScrollView>
        {this.props.ListHeaderComponent ? this.props.ListHeaderComponent : null}
        {this.props.data.map((item, index) => (
          <Observer key={this.props.keyExtractor(item, index)}>
            {() => this.props.renderItem({ item })}
          </Observer>
        ))}
        {this.props.ListFooterComponent ? this.props.ListFooterComponent : null}
      </ScrollView>
    )
  }
}
