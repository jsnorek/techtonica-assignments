import { test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SightingsForm from "../SightingsForm";

test('renders Sightings Form component correctly', () => {
    const {getByPlaceholderText, unmount } = render(<SightingsForm />);

    expect(getByPlaceholderText("Individual ID")).toBeDefined();
    expect(getByPlaceholderText("Location")).toBeDefined();
    expect(getByPlaceholderText("Email")).toBeDefined();
    unmount();
});

test('Sightings Form renders our mock data correctly', () => {
    const { unmount } = render(<SightingsForm />);
    const individualId = screen.getByPlaceholderText('Individual ID');

    fireEvent.change(individualId, { target: { value: 1}});
    
    expect(Number(individualId.value)).toBe(1);
    unmount();
})

test('Sightings Form calls addNewSighting on submit', () => {
    const mockAddNewSighting = vi.fn();  // Mock function

    render(<SightingsForm addNewSighting={mockAddNewSighting} />);

    // Simulate filling out the form inputs
    const dateTimeInput = screen.getByLabelText('Date & Time of Sighting');
    const individualIdInput = screen.getByPlaceholderText('Individual ID');
    const locationInput = screen.getByPlaceholderText('Location');
    const healthyCheckbox = screen.getByLabelText('Healthy?');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(dateTimeInput, { target: { value: '2023-09-17T10:30' }});
    fireEvent.change(individualIdInput, { target: { value: '1' }});
    fireEvent.change(locationInput, { target: { value: 'Forest' }});
    fireEvent.click(healthyCheckbox);  // Checkbox just needs to be clicked
    fireEvent.change(emailInput, { target: { value: 'test@example.com' }});

    // Simulate form submission
    // const submitButton = screen.getByText('Save New Sighting');
    const submitButton = screen.getByRole('button', {name: /Save New Sighting/i});
    fireEvent.click(submitButton);

    // Wait for the async form submission and mock function to be called
     waitFor(() => {
        expect(mockAddNewSighting).toHaveBeenCalled();
    });
});