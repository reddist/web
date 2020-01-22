import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[scrollTo]'
})
export class SmoothScrollToDirective {
  targetElement: any;
  callbackBeforeEx: any;
  callbackAfterEx: any;

  constructor() { }
  @Input() scrollTo: any;
  @Input() duration: number;
  @Input() offset: number;
  @Input() easing: string;
  @Input() callbackBefore: any;
  @Input() callbackAfter: any;
  @Input() containerId: string;

  @HostListener('click') onClick() {

    this.targetElement = document.getElementById(this.scrollTo);
    if (!this.targetElement) { return; }
    // tslint:disable-next-line:variable-name
    const _callbackBefore = this.callbackBefore;
    const callbackBefore = (element) => {
      if (_callbackBefore) {
        const exprHandler = this.callbackBeforeEx({ element });
        if (typeof exprHandler === 'function') {
          exprHandler(element);
        }
      }
    };

    // tslint:disable-next-line:variable-name
    const _callbackAfter = this.callbackBefore;
    const callbackAfter = (element) => {
      if (_callbackAfter) {
        const exprHandler = this.callbackAfterEx({ element });
        if (typeof exprHandler === 'function') {
          exprHandler(element);
        }
      }
    };

    // tslint:disable-next-line:no-unused-expression
    new SmoothScroll(this.targetElement, {
      duration: this.duration,
      offset: this.offset,
      easing: this.easing,
      callbackBefore,
      callbackAfter,
      containerId: this.containerId
    });
  }

}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[smoothScroll]'
})

export class SmoothScrollDirective {

  constructor() { }

  @Input() scrollIf: any;
  @Input() duration: number;
  @Input() offset: number;
  @Input() easing: string;
  @Input() callbackBefore: any;
  @Input() callbackAfter: any;
  @Input() containerId: string;

  @HostListener('click', ['$event.target']) onClick(target) {

    if (typeof this.scrollIf === 'undefined' || this.scrollIf === 'true') {
      setTimeout(function() {

        const callbackBefore = function(element) {
          if (this.callbackBefore) {
            const exprHandler = this.callbackBefore({ element });
            if (typeof exprHandler === 'function') {
              exprHandler(element);
            }
          }
        };

        const callbackAfter = function(element) {
          if (this.callbackAfter) {
            const exprHandler = this.callbackAfter({ element });
            if (typeof exprHandler === 'function') {
              exprHandler(element);
            }
          }
        };

        // tslint:disable-next-line:no-unused-expression
        new SmoothScroll(target, {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
          callbackBefore,
          callbackAfter,
          containerId: this.containerId
        });
      }, 0);
    }
  }

}


class SmoothScroll {
  constructor(element: any, options: any) {
    this.smoothScroll(element, options);
  }
  private smoothScroll(element, options) {
    options = options || {};

    // Options
    // tslint:disable-next-line:one-variable-per-declaration
    const duration = options.duration || 800,
      offset = options.offset || 0,
      easing = options.easing || 'easeInOutQuart',
      // tslint:disable-next-line:only-arrow-functions
      callbackBefore = options.callbackBefore || function() { },
      // tslint:disable-next-line:only-arrow-functions
      callbackAfter = options.callbackAfter || function() { },
      container = document.getElementById(options.containerId) || null,
      containerPresent = (container !== undefined && container != null);

    /**
     * Retrieve current location
     */
    const getScrollLocation = () => {
      if (containerPresent) {
        return container.scrollTop;
      } else {
        if (window.pageYOffset) {
          return window.pageYOffset;
        } else {
          return document.documentElement.scrollTop;
        }
      }
    };

    /**
     * Calculate easing pattern.
     *
     * 20150713 edit - zephinzer
     * - changed if-else to switch
     * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
     */
    const getEasingPattern = (type, time) => {
      switch (type) {
        case 'easeInQuad': return time * time; // accelerating from zero velocity
        case 'easeOutQuad': return time * (2 - time); // decelerating to zero velocity
        // tslint:disable-next-line:max-line-length
        case 'easeInOutQuad': return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
        case 'easeInCubic': return time * time * time; // accelerating from zero velocity
        case 'easeOutCubic': return (--time) * time * time + 1; // decelerating to zero velocity
        // tslint:disable-next-line:max-line-length
        case 'easeInOutCubic': return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
        case 'easeInQuart': return time * time * time * time; // accelerating from zero velocity
        case 'easeOutQuart': return 1 - (--time) * time * time * time; // decelerating to zero velocity
        // tslint:disable-next-line:max-line-length
        case 'easeInOutQuart': return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
        case 'easeInQuint': return time * time * time * time * time; // accelerating from zero velocity
        case 'easeOutQuint': return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
        // tslint:disable-next-line:max-line-length
        case 'easeInOutQuint': return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
        default: return time;
      }
    };

    /**
     * Calculate how far to scroll
     */
      // tslint:disable-next-line:no-shadowed-variable
    const getEndLocation = (element) => {
      let location = 0;
      if (element.offsetParent) {
        do {
          location += element.offsetTop;
          element = element.offsetParent;
        } while (element);
      }
      location = Math.max(location - offset, 0);
      return location;
    };

    // Initialize the whole thing
    setTimeout(() => {
      // tslint:disable-next-line:one-variable-per-declaration
      let currentLocation = null,
        // tslint:disable-next-line:prefer-const
        startLocation = getScrollLocation(),
        // tslint:disable-next-line:prefer-const
        endLocation = getEndLocation(element),
        timeLapsed = 0,
        // tslint:disable-next-line:prefer-const
        distance = endLocation - startLocation,
        percentage,
        position,
        scrollHeight,
        internalHeight;

      /**
       * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
       */
      const stopAnimation = () => {
        currentLocation = getScrollLocation();
        if (containerPresent) {
          scrollHeight = container.scrollHeight;
          internalHeight = container.clientHeight + currentLocation;
        } else {
          scrollHeight = document.body.scrollHeight;
          internalHeight = window.innerHeight + currentLocation;
        }

        if (
          ( // condition 1
            position === endLocation
          ) ||
          ( // condition 2
            currentLocation === endLocation
          ) ||
          ( // condition 3
            internalHeight >= scrollHeight
          )
        ) { // stop
          clearInterval(runAnimation);
          callbackAfter(element);
        }
      };

      /**
       * Scroll the page by an increment, and check if it's time to stop
       */
      const animateScroll = () => {
        timeLapsed += 16;
        percentage = (timeLapsed / duration);
        percentage = (percentage > 1) ? 1 : percentage;
        position = startLocation + (distance * getEasingPattern(easing, percentage));
        if (containerPresent) {
          container.scrollTop = position;
        } else {
          window.scrollTo(0, position);
        }
        stopAnimation();
      };
      callbackBefore(element);
      const runAnimation = setInterval(animateScroll, 16);
    }, 0);

  }
}
