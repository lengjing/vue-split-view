import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

export interface ISashEvent {
  target: EventTarget | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export enum SashState {
  Disabled,
  Minimum,
  Maximum,
  Enabled,
}

@Component()
class Sash extends Vue {
  @Prop({ default: false })
  horizontal!: boolean;
  @Prop({ default: 4 })
  size!: number;
  @Prop()
  position!: number;
  @Prop()
  state!: SashState;

  private active: boolean = false;
  private sashEvent: ISashEvent = {
    target: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  }
  get style() {
    if (this.horizontal) {
      return {
        width: `${this.size}px`,
        height: '100%',
        left: `${this.position}px`
      }
    }
    return {
      width: '100%',
      height: `${this.size}px`,
      top: `${this.position}px`
    }
  }
  get className() {
    return [
      'sash',
      this.horizontal ? 'horizontal' : 'vertical'
    ]
  }
  get cursor() {
    let cursor = '';
    if (this.horizontal) {
      if (this.state === SashState.Minimum) {
        cursor = 'e-resize'
      } else if (this.state === SashState.Maximum) {
        cursor = 'w-resize'
      } else {
        cursor = 'col-resize'
      }
    } else {
      if (this.state === SashState.Minimum) {
        cursor = 's-resize'
      } else if (this.state === SashState.Maximum) {
        cursor = 'n-resize'
      } else {
        cursor = 'row-resize'
      }
    }
    return cursor
  }

  created() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }
  destoryed() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
  onMouseDown(e: MouseEvent) {
    this.sashEvent.target = e.target;
    this.sashEvent.startX = e.pageX;
    this.sashEvent.startY = e.pageY;

    this.$emit('start', this.sashEvent);
    this.active = true;
  }
  onMouseMove(e: MouseEvent) {
    if (this.sashEvent.target) {
      this.sashEvent.currentX = e.pageX;
      this.sashEvent.currentY = e.pageY;

      this.$emit('change', this.sashEvent);
    }
  }
  onMouseUp(e: MouseEvent) {
    if (this.sashEvent.target) {
      this.sashEvent.currentX = e.pageX;
      this.sashEvent.currentY = e.pageY;

      this.$emit('end', this.sashEvent);

      this.sashEvent.target = null;
      this.active = false;
    }
  }
  render() {
    return (
      <div class={this.className} onmousedown="this.onMouseDown">
        {this.active &&
          <style>{`*cursor: ${this.cursor} !important; user-select: none;`}</style>}
      </div>
    )
  }
}

export default Sash;
