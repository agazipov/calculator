import React from 'react';
import { expect, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import App from '../src/pages/App';

test('renders calculator', () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/1/i);
    expect(buttonElement).toBeTruthy();
});

test('adds numbers', async () => {
    const { getByText, findByText } = render(<App />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    const resultElement = await findByText('3', { selector: '.inputs__result' });
    expect(resultElement).toBeTruthy();
});

test('keybord click', async () => {
    const { findByText } = render(<App />);
    const divElement = await findByText('0', { selector: '.inputs__result' });
    fireEvent.keyDown(divElement, { key: '1', code: 'Digit1', charCode: 0 });
    fireEvent.keyDown(divElement, { key: '+', code: 'NumpadAdd', charCode: 0 });
    fireEvent.keyDown(divElement, { key: '2', code: 'Digit2', charCode: 0 });
    fireEvent.keyDown(divElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    const resultElement = await findByText('3', { selector: '.inputs__result' });
    expect(resultElement).toBeTruthy();
});

test('complex calculation', async () => {
    const { getByText, findByText } = render(<App />);
    const divElement = await findByText('0', { selector: '.inputs__result' });
    fireEvent.click(getByText('√'));
    fireEvent.keyDown(divElement, { key: 'Shift', code: 'ShiftLeft', charCode: 0 });
    fireEvent.keyDown(divElement, { key: '(', code: 'Digit9', charCode: 0 });
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('×'));
    fireEvent.click(getByText('3'));
    fireEvent.keyDown(divElement, { key: 'Shift', code: 'ShiftLeft', charCode: 0 });
    fireEvent.keyDown(divElement, { key: ')', code: 'Digit0', charCode: 0 });
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    const resultElement = await findByText('1', { selector: '.inputs__result' });
    expect(resultElement).toBeTruthy();
});