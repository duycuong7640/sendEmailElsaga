import { Transform } from 'class-transformer';
import { parsePhoneNumber } from 'libphonenumber-js';
import { castArray, isArray, isNil, map, trim } from 'lodash';
import * as sanitizeHtml from 'sanitize-html';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns PropertyDecorator
 * @constructor
 */
export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    if (isArray(value)) {
      return map(value, (v) => trim(v).replace(/\s\s+/g, ' '));
    }

    return trim(value).replace(/\s\s+/g, ' ');
  });
}

/**
 * @description remove dirty html tag
 * @example
 * @ApiProperty()
 * @IsString()
 * @SanitizeHtml()
 * name: string;
 * @returns PropertyDecorator
 * @constructor
 */
export function SanitizeHtml(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    const options: sanitizeHtml.IOptions = {
      // allowedAttributes: {
      //   ...sanitizeHtml.defaults.allowedAttributes,
      //   p: ['style'],
      // },
      allowedTags: [
        'p',
        'em',
        'u',
        's',
        'span',
        'div',
        'ol',
        'ul',
        'li',
        'strong',
        'label',
        'table',
        'th',
        'tr',
        'td',
        'front',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'img',
        'a',
      ],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        p: ['style', 'class', 'id'],
        em: ['style', 'class', 'id'],
        u: ['style', 'class', 'id'],
        s: ['style', 'class', 'id'],
        span: ['style', 'class', 'id'],
        div: ['style', 'class', 'id'],
        ol: ['style', 'class', 'id'],
        ul: ['style', 'class', 'id'],
        li: ['style', 'class', 'id'],
        strong: ['style', 'class', 'id'],
        label: ['style', 'class', 'id'],
        table: ['style', 'class', 'id'],
        th: ['style', 'class', 'id'],
        tr: ['style', 'class', 'id'],
        td: ['style', 'class', 'id'],
        front: ['style', 'class', 'id'],
        h1: ['style', 'class', 'id'],
        h2: ['style', 'class', 'id'],
        h3: ['style', 'class', 'id'],
        h4: ['style', 'class', 'id'],
        h5: ['style', 'class', 'id'],
        h6: ['style', 'class', 'id'],
        img: ['style', 'class', 'id', 'src', 'alt', 'width', 'height'],
        a: ['style', 'class', 'id', 'href', 'target', 'rel'],
      },
      // allowedStyles: {
      //   '*': {
      //     'text-align': [/^left$/, /^right$/, /^center$/],
      //   },
      // },
    };

    if (isArray(value)) {
      return map(value, (v) => (v ? sanitizeHtml(v, options) : v));
    }

    return params.value ? sanitizeHtml(params.value, options) : params.value;
  });
}

export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return params.value;
      }
    },
    { toClassOnly: true },
  );
}

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns PropertyDecorator
 * @constructor
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string;

      return Number.parseInt(value, 10);
    },
    { toClassOnly: true },
  );
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function PhoneNumberSerializer(): PropertyDecorator {
  return Transform((params) => parsePhoneNumber(params.value as string).number);
}
