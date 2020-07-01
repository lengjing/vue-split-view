import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

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
