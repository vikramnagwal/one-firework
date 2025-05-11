import mimicFunction from "mimic-function";

type AnyFunction = (...args: any[]) => any;

interface FireworkOptions {
    throwOnMaxCalls?: boolean;
    fireShots?: number;
}

interface FireworkFactory {
    <T extends AnyFunction>(function_: T, options?: FireworkOptions): T;
    fired(function_: AnyFunction): number;
}

const calledFunction = new WeakMap<AnyFunction, number>();

const firework = (<T extends AnyFunction>(function_: T, options: FireworkOptions = {}): T => {
    if (typeof function_ !== 'function') {
        throw new TypeError(`Expected a function, but received \`${typeof function_}\`. Please pass a function.`)
    }

    let originalFunction: T | undefined = function_;
    let returnValue: ReturnType<T>;
    let fireCount = 0;
    const functionName = function_.name || '<anonymous>';

    const fireworkFunction = (...args_: Parameters<T>): ReturnType<T> => {
        fireCount++;
        calledFunction.set(fireworkFunction, fireCount);

        if (fireCount === 1) {
            try {
            returnValue = originalFunction!.apply(this, args_);
        } finally {
            originalFunction = undefined;
        }
        } else if (options.throwOnMaxCalls === true) {
            throw new Error(`Function \`${functionName}\` can only be called once! Called \`${fireCount}\` times`)
        }

        return returnValue as ReturnType<T>;
    }

    mimicFunction(fireworkFunction, originalFunction);
    return fireworkFunction as T;
}) as FireworkFactory;

firework.fired = (wrappedFunction: AnyFunction): number => {
    if (!calledFunction.has(wrappedFunction!)) {
        const funcName = wrappedFunction?.name || '<anonymous function>';
        throw new Error(`The function \`${funcName}\` was not created by \`firework\` or has not been called yet.`);
    }
    return calledFunction.get(wrappedFunction)!;
};


export default firework;