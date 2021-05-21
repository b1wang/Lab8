/**
 * @jest-environment jsdom
 */

 import { test } from '@jest/globals';
//import { describe } from 'yargs';
import { pushToHistory } from '../scripts/router.js';

describe('Checking history stack...', () => {

    // Test push home
    test('Current state after pushing home ', () => {
        var history = pushToHistory('home', 0);
        expect(history.state).toEqual({});
    });

    test('Current history stack length: ', () => {
        expect(history.length).toBe(2);
    });

    // Test push settings
    test('Current state after pushing settings ', () => {
        var history = pushToHistory('settings', 0);
        expect(history.state).toEqual({"page": "settings"});
    });

    test('Current history stack length: ', () => {
        expect(history.length).toBe(3);
    });


    // Test push entry
    test('Current state after pushing entry2 ', () => {
        history = pushToHistory('entry', 1);
        expect(history.state).toEqual({"page": "entry1"});
    });

    test('Current history stack length: ', () => {
        expect(history.length).toBe(4);
    });

    
});