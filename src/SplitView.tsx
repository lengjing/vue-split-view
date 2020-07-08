import Vue from 'vue';
import Sash from './Sash';
import View from './View';
import { Component, Prop } from 'vue-property-decorator';

/**
 *
 * <SplitView horizontal={true} size={1000}>
 *    <SplitView.View initialSize={200} maximumSize={400} minimumSize={100} />
 *    <SplitView.View initialSize={200} maximumSize={400} minimumSize={100} />
 * </SplitView>
 */
@Component()
class SplitView extends Vue {
  @Prop({ default: true })
  horizontal!: boolean;
  @Prop()
  size!: number;

  renderView() {
  }
  renderSash() {
  }
  render() {
    return (
      <div class="split-view">
        {this.renderSash()}
        {this.renderView()}
      </div>
    )
  }
}
