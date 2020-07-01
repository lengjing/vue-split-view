import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component()
class View extends Vue {
  @Prop()
  size!: number;
  @Prop()
  initialSize!: number;
  @Prop()
  maximumSize!: number;
  @Prop()
  minimumSize!: number;

  render() {
    return (
      <div class="view">{this.$slots.default}</div>
    )
  }
}

export default View;
