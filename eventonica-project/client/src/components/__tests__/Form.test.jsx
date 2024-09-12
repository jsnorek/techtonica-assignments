import { test, expect, vi } from "vitest";
import { render } from '@testing-library/react';
import Form from  "../Form";

test('renders Form component correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);

    expect(getByPlaceholderText("Location")).toBeDefined();

    expect(getByText("Location")).toBeDefined();
});