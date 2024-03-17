import React, { useState, useRef, useEffect } from 'react';
import * as typst from '@myriaddreamin/typst.ts';

export interface TypstDocumentProps {
  artifact: ArrayBuffer | undefined;
  domScale: number | undefined;
}

export const TypstDocument = ({ artifact, domScale }: TypstDocumentProps) => {
  /// --- beg: manipulate permission --- ///

  // todo: acquire permission
  const [permission, setPermissionInternal] = useState(false);
  const setPermissionAndOk = (status: PermissionStatus) => {
    if (status.state === 'granted') {
      setPermissionInternal(true);
      return true;
    }
    setPermissionInternal(false);
    return false;
  };
  useEffect(() => {
    navigator.permissions.query({ name: 'local-fonts' as PermissionName }).then(status => {
      if (setPermissionAndOk(status)) {
        return false;
      }
      status.addEventListener('change', event => {
        console.log(event, status);
        setPermissionAndOk(status);
      });
    });
  });

  /// --- end: manipulate permission --- ///

  /// --- beg: update document --- ///
  const displayDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!artifact) {
      return;
    }

    let plugin = typst.createTypstRenderer();
    console.log(plugin);

    const tsModule = fetch(`/typst/typst_ts_renderer_bg.wasm`);

    plugin.init({ getModule: () => tsModule })
      .then(() => new Uint8Array(artifact))
      .then(artifactData => {
        return new Promise(resolve => {
          plugin.runWithSession(
            ses =>
              new Promise(dispose => {
                // ignore dispose
                void dispose;

                const t = performance.now();
                const dom = plugin.renderDom({
                  renderSession: ses,
                  container: displayDivRef.current!,
                  pixelPerPt: 4.5,
                  domScale: domScale ?? 1.0,
                });

                dom.then((dom) => {
                  console.log(dom);
                  // FIXME: artifactData is not string type
                  dom.addChangement(['new', artifactData as any as string]);
                  console.log('render time', performance.now() - t);

                  window.addEventListener('resize', () => dom.addViewportChange());
                  window.addEventListener('scroll', () => dom.addViewportChange());
                })
              }),
          );
        });
      });
  }, [displayDivRef, artifact]);

  /// --- end: update document --- ///

  return (
    <div>
      <div className="typst-app" ref={displayDivRef}></div>
    </div>
  );
};
