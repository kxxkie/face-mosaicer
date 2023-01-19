import styled from '@emotion/styled';
import { colors, mediaQuerys } from '@/libs/styles';
import { RootLayout } from '@/components/layouts';
import { useEditor } from '@/hooks/organisms/Editor';
import { Flex, Button, LoadingCover } from '@/components/atoms';
import { FaceSelect, FaceTypeInput, MosaicSizeInput, EmojiInput, SwitchVisibility } from '@/components/organisms';
import { FACE } from '@/constants';

const NavText = styled.div({ fontSize: 14, cursor: 'pointer', color: colors.acceents[4], userSelect: 'none' });
const ImageDisplayWrapper = styled.div({
  position: 'relative',
  width: FACE.PREVIEW_SIZE,
  [mediaQuerys.sp]: { order: -1, width: '100%' },
});
const ImageDisplay = styled.canvas({
  display: 'block',
  marginLeft: 'auto',
  maxWidth: '100%',
  [mediaQuerys.sp]: { marginInline: 'auto' },
});
const OptionList = styled.ul({
  display: 'flex',
  rowGap: 30,
  flexDirection: 'column',
  [mediaQuerys.sp]: { alignItems: 'center' },
});
const OptionSection = styled(Flex)({ rowGap: 10, flexDirection: 'column' });
const OptionLabel = styled.div({ color: colors.acceents[4], fontSize: 14 });
const FullSizeCanvas = styled.canvas({ display: 'none' });
const FullSizeAnchor = styled.a({ display: 'none' });
const Wrapper = styled(Flex)({
  marginTop: 60,
  justifyContent: 'space-between',
  columnGap: 60,
  [mediaQuerys.sp]: { flexDirection: 'column', rowGap: 60, alignItems: 'center' },
});

interface Props {
  file: File;
  goBack: () => void;
}

export const Editor: React.FC<Props> = ({ file, goBack }) => {
  const {
    isLoading,
    isDownloading,
    faceList,
    activeFace,
    setActiveIndex,
    updateFaceList,
    lazyUpdateFaceList,
    downloadFullSize,
    canvasRef,
    anchorRef,
    fullSizeCanvasRef,
  } = useEditor(file);

  return (
    <RootLayout>
      <NavText onClick={goBack}>GO BACK</NavText>
      <Wrapper>
        <OptionList>
          {!isLoading &&
            (!!faceList.length ? (
              <>
                <FaceSelect faceListLength={faceList.length} onChange={(faceNo) => setActiveIndex(faceNo)} />
                <OptionSection>
                  <OptionLabel>Type</OptionLabel>
                  <FaceTypeInput
                    faceType={activeFace.type}
                    onChange={(type) => updateFaceList({ ...activeFace, type })}
                  />
                </OptionSection>
                {activeFace.type === 'mosaic' && (
                  <OptionSection>
                    <OptionLabel>Mosaic Size</OptionLabel>
                    <MosaicSizeInput
                      mosaicSize={activeFace.mosaicSize}
                      onChange={(mosaicSize) => lazyUpdateFaceList({ ...activeFace, mosaicSize })}
                    />
                  </OptionSection>
                )}
                {activeFace.type === 'emoji' && (
                  <OptionSection>
                    <OptionLabel>Emoji List</OptionLabel>
                    <EmojiInput
                      faceExpression={activeFace.expression}
                      onChange={(expression) => updateFaceList({ ...activeFace, expression })}
                    />
                  </OptionSection>
                )}
                {activeFace.type === 'own' && (
                  <OptionSection>
                    <OptionLabel>Upload your image</OptionLabel>
                    <input
                      type="file"
                      onChange={(e) => updateFaceList({ ...activeFace, image: e.target.files?.[0] })}
                    />
                  </OptionSection>
                )}
                <OptionSection>
                  <OptionLabel>Show / Hide</OptionLabel>
                  <SwitchVisibility
                    hidden={activeFace.hidden}
                    onChange={(hidden) => updateFaceList({ ...activeFace, hidden })}
                  />
                </OptionSection>
                <OptionSection
                  css={{ flexGrow: 1, justifyContent: 'flex-end', [mediaQuerys.sp]: { maxWidth: 250, width: '100%' } }}
                >
                  <Button onClick={downloadFullSize} isLoading={isDownloading}>
                    download
                  </Button>
                </OptionSection>
              </>
            ) : (
              <p>Sorry, we couldnt detect any faces in this image. Please try another image.</p>
            ))}
        </OptionList>
        <ImageDisplayWrapper>
          {isLoading && (
            <LoadingCover>
              <p>Detecting...</p>
            </LoadingCover>
          )}
          <ImageDisplay ref={canvasRef} />
          <FullSizeCanvas ref={fullSizeCanvasRef} />
          <FullSizeAnchor ref={anchorRef} download={`edited_${file.name}`} />
        </ImageDisplayWrapper>
      </Wrapper>
    </RootLayout>
  );
};
