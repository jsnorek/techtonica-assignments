import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react'
import SpeciesForm from  "../SpeciesForm";

test('renders Species Form component correctly', () => {
    const { getByPlaceholderText } = render(<SpeciesForm />);

    expect(getByPlaceholderText("Estimated Population")).toBeDefined();
    expect(getByPlaceholderText("Common Name")).toBeDefined();
});

test('Species Form renders our mock data correctly', () => {
    render(<SpeciesForm onSaveSpecies={vi.fn()} />);
    const commonNameInput = screen.getByPlaceholderText('Common Name');
    const scientificNameInput = screen.getByPlaceholderText('Scientific Name');
    const estimatedPopulation = screen.getByPlaceholderText('Estimated Population');


  fireEvent.change(commonNameInput, { target: { value: 'Species Name' } });
  fireEvent.change(scientificNameInput, { target: { value: 'Species Scientific Name' } });
  fireEvent.change(estimatedPopulation, { target: { value: 100 }});


  expect(commonNameInput.value).toBe('Species Name');
  expect(scientificNameInput.value).toBe('Species Scientific Name');
  //add Number so it treats the value as a number for the comparison
  expect(Number(estimatedPopulation.value)).toBe(100);

});