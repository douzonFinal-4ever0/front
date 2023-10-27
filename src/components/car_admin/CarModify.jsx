const CarModify = () => {
  return (
    <Box sx={{ ...style, width: 750 }}>
      <Box sx={{ pt: 2, px: 4, pb: 3, bgcolor: 'background.paper' }}>
        <Box>
          <Typography
            sx={{
              paddingTop: '2px',
              paddingBottom: '2px'
            }}
            variant="h5"
            id="parent-modal-title"
          >
            차량 수정
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          marginTop="15px"
          sx={{
            width: '100%',
            borderBottom: '3px solid black',
            padding: '5px 0px'
          }}
        >
          <RectangleIcon
            sx={{
              color: 'black',
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '6px',
              height: '6px'
            }}
          />
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
            기본 정보
          </Typography>
        </Box>
        {/* input Form */}
        <Grid container spacing={1} margin="5px 0px" padding="0px 6px">
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'carName'} text={'차량명'} />
            </StyledLabelGrid>
            <Grid item xs={10}>
              <TextField
                id="carName"
                variant="outlined"
                value={carModifyInfo.car_name}
                onChange={(e) => {
                  setCarModifyInfo({
                    ...carModifyInfo,
                    car_name: e.target.value
                  });
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'fuel_effciency'} text={'연비'} />
            </StyledLabelGrid>
            <Grid item xs={10}>
              <TextField
                id="fuel_effciency"
                variant="outlined"
                value={carModifyInfo.carDetail.fuel_effciency}
                onChange={(e) => {
                  setCarModifyInfo({
                    ...carModifyInfo,
                    carDetail: {
                      ...carModifyInfo.carDetail,
                      fuel_effciency: e.target.value
                    }
                  });
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'accum_mileage'} text={'누적 주행 거리'} />
            </StyledLabelGrid>
            <Grid item xs={10}>
              <TextField
                id="accum_mileage"
                variant="outlined"
                value={carModifyInfo.carDetail.accum_mileage}
                onChange={(e) => {
                  setCarModifyInfo({
                    ...carModifyInfo,
                    carDetail: {
                      ...carModifyInfo.carDetail,
                      accum_mileage: e.target.value
                    }
                  });
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'memo'} text={'메모'} />
            </StyledLabelGrid>
            <Grid item xs={10}>
              <TextField
                id="memo"
                variant="outlined"
                value={carModifyInfo.memo}
                onChange={(e) => {
                  setCarModifyInfo({
                    ...carModifyInfo,
                    memo: e.target.value
                  });
                }}
                multiline
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'authority'} text={'권한'} />
            </StyledLabelGrid>
            <Grid item xs={10}>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={carModifyInfo.authority}
                onChange={handleCarAuthority}
              >
                <FormControlLabel
                  value="모두"
                  control={<Radio />}
                  label="전체 사용 가능"
                />
                <FormControlLabel
                  value="지정"
                  control={<Radio />}
                  label="선택 사용자만 사용 가능"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          {isShowSelectUser === true ? (
            <Grid item container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item container xs={10} spacing={1}>
                <Grid item xs={5}>
                  {customList(
                    left,
                    <CardHeader
                      sx={{ px: 2, py: 1 }}
                      titleTypographyProps={{ variant: 'subtitle1' }}
                      title="지정 사용자"
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      item
                      xs={6}
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  {customList(
                    filterMemData,
                    <CardHeader
                      sx={{ px: 2, py: 1 }}
                      title={
                        <UserSearchBar
                          placeholder={'사용자명 검색'}
                          value={inputUser}
                          handleInput={handleInputUser}
                        ></UserSearchBar>
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Box>
      <Grid
        container
        xs={12}
        sx={{ m: '10px 0px' }}
        justifyContent="center"
        spacing={2}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: '#BEBEBE',
            backgroundColor: '#ffffff',
            ':hover': {
              backgroundColor: '#ffffff',
              borderColor: '#BEBEBE'
            },
            margin: '0px 4px'
          }}
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          variant="contained"
          sx={{
            borderColor: '#BEBEBE',
            ':hover': {
              backgroundColor: '#2065D1',
              borderColor: '#BEBEBE'
            },
            margin: '0px 4px'
          }}
          onClick={clickModifyBtn}
        >
          수정
        </Button>
      </Grid>
    </Box>
  );
};

export default CarModify;
