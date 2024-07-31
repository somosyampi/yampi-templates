import _get from 'lodash/get';
import _join from 'lodash/join';
import _filter from 'lodash/filter';
import _replace from 'lodash/replace';
import _trimStart from 'lodash/trimStart';
import _startsWith from 'lodash/startsWith';

function forceHttpUrl(url, useHttps = false)
{
    const protocol = useHttps
                ? 'https://'
                : 'http://';

    return _startsWith(url, 'http')
                ? url
                : `${protocol}${_trimStart(url, ':/')}`;
}

function forceHttpsUrl(url)
{
    return _replace(forceHttpUrl(url), 'http://', 'https://');
}

export default class ThumborUrlBuilder
{
    constructor(url, params = {})
    {
        this.url = forceHttpsUrl(url);

        params = {
            ...window.Yampi.thumbor.default,
            ...params,
        };

        this.trim = _get(params, 'trim');
        this.fitIn = _get(params, 'fitIn');
        this.crop = _get(params, 'crop');
        this.resize = _get(params, 'resize');
        this.hAlign = _get(params, 'hAlign');
        this.vAlign = _get(params, 'vAlign');
        this.smart = _get(params, 'smart');
        this.filters = _get(params, 'filters', []);
    }

    addFilter(newFilter)
    {
        this.filters.push(newFilter);

        return this;
    }

    generate()
    {
        if (!window.Yampi.thumbor.enabled) {
            return this.url;
        }

        const host = window.Yampi.thumbor.url;
        const url = this._generateUrlParts();
        const signature = 'unsafe';

        return _join([host, signature, url], '/');
    }

    _generateUrlParts()
    {
        return _join(_filter([
            this.trim,
            this.crop,
            this.fitIn,
            this.resize,
            this.hAlign,
            this.vAlign,
            this.smart,
            this._generateFilters(),
            this.url,
        ]), '/');
    }

    _generateFilters()
    {
        if (this.filters.length === 0) {
            return;
        }

        return _join(['filters', ...this.filters], ':');
    }
}
