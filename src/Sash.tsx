import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component()
class Sash extends Vue {
  render() {
    return (
      <div class="sash" onmousedown="this.onMouseDown" onmouseup="this.onMouseUp"></div>
    )
  }
}
