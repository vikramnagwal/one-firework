import { test } from 'uvu';
import * as assert from 'uvu/assert';
import firework from '.';


test('should call original logic only once and return cached value', () => {
	let count = 0;
	const func = () => {
		return ++count;
	};

	const wrappedFunc = firework(func);

	const result2 = wrappedFunc();

	assert.is(result2, 1, 'Second call should return the cached result (1)');
});

test('should throw error if not a function', () => {
	const notAFunction = "not a function";

	assert.throws(() => {
		firework(notAFunction as any);
	}, 'Should throw an error if not a function');
})

test('should throw error for exceeding max calls', () => {
	const func = () => {
		return 'hii';
	}

	const wrappedFunc = firework(func, { throwOnMaxCalls: true})
	wrappedFunc(); // First call should work fine
	assert.throws(() => {
		wrappedFunc(); // Second call should throw an error
	}, 'Should throw an error if called more than once with throwOnMaxCalls set to true');
})

test('should show call counts', () => {
	let count = 0;
	const func = firework(() => ++count);
	func();
	func();
	func();
	assert.match(firework.fired(func).toString(), '3')
})

test.run();