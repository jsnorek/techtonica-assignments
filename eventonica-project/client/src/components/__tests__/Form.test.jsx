import { test, expect, vi } from "vitest";
import { render, fireEvent } from '@testing-library/react';
import { Form } from  "./components/Form";

test('renders Form component correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);

    expect(getByPlaceholderText("Location")).toBeDefined();

    expect(getByText("Location")).toBeDefined();
});