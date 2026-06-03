import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Home } from './Home';
import { SCHOOLS } from '../constants/common';

describe('Home', () => {
  it('renders the hero and all school cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /tính điểm xét tuyển/i })
    ).toBeInTheDocument();

    SCHOOLS.forEach((school) => {
      expect(screen.getByText(school.acronym)).toBeInTheDocument();
    });
  });
});
