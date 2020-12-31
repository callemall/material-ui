/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import useAutocomplete, { createFilterOptions } from '@material-ui/core/useAutocomplete';

describe('useAutocomplete', () => {
  const render = createClientRender();

  it('should use unique keys for the option', () => {
    let keys;
    const Test = () => {
      const {
        groupedOptions,
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
      } = useAutocomplete({
        options: [{ label: 'foo' }, { label: 'bar' }],
        open: true,
      });

      keys = groupedOptions.map((option, index) => getOptionProps({ option, index }).key);

      return (
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
            <input {...getInputProps()} />
          </div>
          {groupedOptions.length > 0 ? (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option.title}</li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    };

    render(<Test />);
    expect(keys).to.deep.equal(['foo', 'bar']);
  });

  describe('createFilterOptions', () => {
    it('defaults to getOptionLabel for text filtering', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'cat',
        },
        {
          id: '5678',
          name: 'dog',
        },
        {
          id: '9abc',
          name: 'emu',
        },
      ];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
        options[0],
      ]);
    });

    it('filters without error with empty option set', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([]);
    });

    describe('option: limit', () => {
      it('limits the number of suggested options to be shown', () => {
        const filterOptions = createFilterOptions({ limit: 2 });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'a1',
          },
          {
            id: '5678',
            name: 'a2',
          },
          {
            id: '9abc',
            name: 'a3',
          },
          {
            id: '9abc',
            name: 'a4',
          },
        ];

        expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
          options[0],
          options[1],
        ]);
      });
    });

    describe('option: matchFrom', () => {
      let filterOptions;
      let getOptionLabel;
      let options;
      beforeEach(() => {
        filterOptions = createFilterOptions({ matchFrom: 'any' });
        getOptionLabel = (option) => option.name;
        options = [
          {
            id: '1234',
            name: 'ab',
          },
          {
            id: '5678',
            name: 'ba',
          },
          {
            id: '9abc',
            name: 'ca',
          },
        ];
      });

      describe('any', () => {
        it('show all results that match', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });

      describe('start', () => {
        it('show only results that start with search', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });
    });

    describe('option: ignoreAccents', () => {
      it('does not ignore accents', () => {
        const filterOptions = createFilterOptions({ ignoreAccents: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'áb',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'áe',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'á', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });

    describe('option: ignoreCase', () => {
      it('matches results with case insensitive', () => {
        const filterOptions = createFilterOptions({ ignoreCase: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'Ab',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'Ae',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'A', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });
  });
});
