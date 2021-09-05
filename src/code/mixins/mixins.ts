import { pipe } from "../../../examples/functional/pipe";

class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}

// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.

type Constructor<T = {}> = new (...args: any[]) => T;

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    private _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  };
}

// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
// const EightBitSprite = Scale(Sprite)
class EightBitSprite extends Scale(Sprite) {
  constructor(name: string) {
    super(name);
    this.setScale(0.8);
  }
}

const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.scale);

// console.log(flappySprite._scale)

type HttpService = {
  get<R>(...args: any[]): R;
};

interface HttpServiceProvider {
  httpService: HttpService;
}

function GetEntityListService<S extends Constructor<HttpServiceProvider>>(
  Base: S
) {
  return class GetEntityListService extends Base {
    getEntityList(): any {
      return undefined as any;
    }
  };
}

function GetEntityListMetaService<S extends Constructor<HttpServiceProvider>>(
  Base: S
) {
  return class GetEntityListMetaService extends Base {
    getEntityListMeta(): any {
      return undefined as any;
    }
  };
}

function GetEntityService<S extends Constructor<HttpServiceProvider>>(Base: S) {
  return class GetEntityService extends Base {
    getEntity(id: number): any {
      return undefined as any;
    }
  };
}

class EntityService implements HttpServiceProvider {
  constructor(public httpService: HttpService) {}
}

const Injectable = () => <T extends { new (...args: any[]): {} }>(
  constructor: T
) => constructor;

@Injectable()
// @ts-ignore
class MessageService extends pipe(
  GetEntityService,
  GetEntityListMetaService,
  GetEntityListService
)(EntityService) {
  constructor(httpService: HttpService) {
    super(httpService);
  }
}

const httpService: HttpService = {
  get<R>(...args: any[]): R {
    return undefined;
  },
};

const ms3 = new MessageService(httpService);
ms3.getEntity(1);
