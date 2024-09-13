import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import Form from  "../Form";

test('renders Form component correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);

    expect(getByPlaceholderText("Location")).toBeDefined();

    expect(getByText("Location")).toBeDefined();
});

test('Form renders our mock data correctly', () => {
    render(<Form onSaveEvent={vi.fn()} onUpdateEvent={vi.fn()} />);
    const titleInput = screen.getByPlaceholderText('Title');
  const locationInput = screen.getByPlaceholderText('Location');
//   const dateInput = screen.getByText('Date');

  fireEvent.change(titleInput, { target: { value: 'New Event' } });
  fireEvent.change(locationInput, { target: { value: 'New Location' } });
//   fireEvent.change(dateInput, { target: { value: '2024-09-12' } });

  expect(titleInput.value).toBe('New Event');
  expect(locationInput.value).toBe('New Location');
//   expect(dateInput.value).toBe('2024-09-12');
});