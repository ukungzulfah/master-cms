import React, { useContext, useState } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import * as Icons from '@mui/icons-material';
import { LayoutContext } from './types';
import type { ContainerProps, MultiChildProps, ExpandedProps, SizedBoxProps, PaddingProps, AlignProps, StackProps, SpacerProps, TextFieldPropsExt, DropdownProps, ButtonPropsExt, CheckboxPropsExt, TypographyPropsExt, IconPropsExt, CardPropsExt, DividerPropsExt, AlertPropsExt, TabsPropsExt, AccordionPropsExt, ModalPropsExt, CircularProgressPropsExt, LinearProgressPropsExt, SkeletonPropsExt, AvatarPropsExt, ChipPropsExt, BadgePropsExt, PaperPropsExt, DatePickerPropsExt, SliderPropsExt, RadioPropsExt, SwitchPropsExt, FabPropsExt, TooltipPropsExt, AutocompletePropsExt, PaginationPropsExt, BreadcrumbsPropsExt, SpeedDialPropsExt, DrawerPropsExt, AppBarPropsExt, DataGridPropsExt } from './types';
import { isConfigObject, mergeSx } from './utils';

// ============================================================================
// COMPONENT IMPLEMENTATIONS
// ============================================================================

// Helper untuk meresolve child: Jika config object, default-nya dirender sebagai Container
const resolveChild = (child: any): React.ReactNode => {
  if (isConfigObject(child)) {
    // Default behavior: Jika nemu object config polos, anggap itu Container
    return React.createElement(ContainerImpl, child);
  }
  return child;
};

// --- Container Implementation ---
export const ContainerImpl: React.FC<ContainerProps> = ({ child, children, ...rest }) => {
  const layoutType = useContext(LayoutContext);

  const resolvedChild = resolveChild(child) ?? children;

  // Logic: Row -> Width auto, Column -> Height auto
  let width = '100%';
  let height = '100%';

  if (layoutType === 'column') height = 'auto';
  if (layoutType === 'row') width = 'auto';

  // Logic: Jika parent Row/Col, jadi Block. Jika standalone, jadi Flex (untuk alignment child)
  const display = layoutType === 'none' ? 'flex' : 'block';

  const baseSx = {
    width,
    height,
    display,
    // Jika mode flex (standalone), default ke center content mirip Flutter Container alignment default
    ...(display === 'flex' ? { alignItems: 'center', justifyContent: 'center' } : {}),
  };

  return (
    <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
      {resolvedChild}
    </Box>
  );
};

// --- Row & Column Implementation ---
export const FlexLayoutImpl: React.FC<MultiChildProps & { type: 'row' | 'column' }> = ({
  children, type, ...rest
}) => {
  // Pastikan children punya key jika berupa array
  const processedChildren = Array.isArray(children)
    ? children.map((c, i) => React.isValidElement(c) ? React.cloneElement(c, { key: i }) : c)
    : children;

  const baseSx = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: type,
  };

  return (
    <LayoutContext.Provider value={type}>
      <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
        {processedChildren}
      </Box>
    </LayoutContext.Provider>
  );
};

// --- Expanded Implementation ---
export const ExpandedImpl: React.FC<ExpandedProps> = ({ child, children, flex = 1, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;

  const baseSx = {
    flex: flex,
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column', // Default aman
  };

  return (
    // Reset context ke 'none' karena Expanded bertindak sebagai boundary baru
    <LayoutContext.Provider value='none'>
      <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
        {resolvedChild}
      </Box>
    </LayoutContext.Provider>
  );
};

// --- SizedBox Implementation ---
export const SizedBoxImpl: React.FC<SizedBoxProps> = ({ width, height }) => (
  <Box sx={{ width, height, flexShrink: 0 }} />
);

// --- Center Implementation ---
export const CenterImpl: React.FC<{ child?: React.ReactNode | any } & BoxProps> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <LayoutContext.Provider value='none'>
      <Box {...rest} sx={mergeSx({ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }, rest.sx)}>
        {resolvedChild}
      </Box>
    </LayoutContext.Provider>
  );
};

// --- Padding Implementation ---
export const PaddingImpl: React.FC<PaddingProps> = ({ child, children, padding, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  const baseSx = {
    padding: padding || 16, // Default padding 16
  };
  return (
    <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
      {resolvedChild}
    </Box>
  );
};

// --- Align Implementation ---
export const AlignImpl: React.FC<AlignProps> = ({ child, children, alignment = 'center', ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  const alignmentMap = {
    topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    topCenter: { justifyContent: 'center', alignItems: 'flex-start' },
    topRight: { justifyContent: 'flex-end', alignItems: 'flex-start' },
    centerLeft: { justifyContent: 'flex-start', alignItems: 'center' },
    center: { justifyContent: 'center', alignItems: 'center' },
    centerRight: { justifyContent: 'flex-end', alignItems: 'center' },
    bottomLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
    bottomCenter: { justifyContent: 'center', alignItems: 'flex-end' },
    bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
  };
  const baseSx = {
    display: 'flex',
    ...alignmentMap[alignment],
  };
  return (
    <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
      {resolvedChild}
    </Box>
  );
};

// --- Stack Implementation ---
export const StackImpl: React.FC<StackProps> = ({ children, ...rest }) => {
  const baseSx = {
    position: 'relative',
  };
  return (
    <Box {...rest} sx={mergeSx(baseSx, rest.sx)}>
      {children}
    </Box>
  );
};

// --- Spacer Implementation ---
export const SpacerImpl: React.FC<SpacerProps> = ({ flex = 1, ...rest }) => {
  const baseSx = {
    flex: flex,
  };
  return (
    <Box {...rest} sx={mergeSx(baseSx, rest.sx)} />
  );
};

// --- TextField Implementation ---
export const TextFieldImpl: React.FC<TextFieldPropsExt> = ({ label, ...rest }) => (
  <TextField label={label} {...rest} />
);

// --- Dropdown Implementation ---
export const DropdownImpl: React.FC<DropdownProps> = ({ options, label, ...rest }) => (
  <FormControl fullWidth>
    {label && <InputLabel>{label}</InputLabel>}
    <Select {...rest}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// --- Button Implementation ---
export const ButtonImpl: React.FC<ButtonPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Button {...rest}>
      {resolvedChild}
    </Button>
  );
};

// --- Checkbox Implementation ---
export const CheckboxImpl: React.FC<CheckboxPropsExt> = (props) => (
  <FormControlLabel {...props} />
);

// --- Typography Implementation ---
export const TypographyImpl: React.FC<TypographyPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Typography {...rest}>
      {resolvedChild}
    </Typography>
  );
};

// --- Icon Implementation ---
export const IconImpl: React.FC<IconPropsExt> = ({ name, fontSize = 'medium', color, ...rest }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent fontSize={fontSize} style={{ color }} {...rest} />;
};

// --- Card Implementation ---
export const CardImpl: React.FC<CardPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Card {...rest}>
      <CardContent>
        {resolvedChild}
      </CardContent>
    </Card>
  );
};

// --- Divider Implementation ---
export const DividerImpl: React.FC<DividerPropsExt> = (props) => (
  <Divider {...props} />
);

// --- Alert Implementation ---
export const AlertImpl: React.FC<AlertPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Alert {...rest}>
      {resolvedChild}
    </Alert>
  );
};

// --- Tabs Implementation ---
export const TabsImpl: React.FC<TabsPropsExt> = ({ tabs, ...rest }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} {...rest}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <Box key={index} hidden={value !== index}>
          {tab.content}
        </Box>
      ))}
    </Box>
  );
};

// --- Accordion Implementation ---
export const AccordionImpl: React.FC<AccordionPropsExt> = ({ title, content, ...rest }) => (
  <Accordion {...rest}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {content}
    </AccordionDetails>
  </Accordion>
);

// --- Modal Implementation ---
export const ModalImpl: React.FC<ModalPropsExt> = ({ child, children, open, onClose, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Modal open={open} onClose={onClose} {...rest}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        {resolvedChild}
      </Box>
    </Modal>
  );
};

// --- CircularProgress Implementation ---
export const CircularProgressImpl: React.FC<CircularProgressPropsExt> = (props) => (
  <CircularProgress {...props} />
);

// --- LinearProgress Implementation ---
export const LinearProgressImpl: React.FC<LinearProgressPropsExt> = (props) => (
  <LinearProgress {...props} />
);

// --- Skeleton Implementation ---
export const SkeletonImpl: React.FC<SkeletonPropsExt> = (props) => (
  <Skeleton {...props} />
);

// --- Avatar Implementation ---
export const AvatarImpl: React.FC<AvatarPropsExt> = ({ src, alt, children, ...rest }) => (
  <Avatar src={src} alt={alt} {...rest}>
    {children}
  </Avatar>
);

// --- Chip Implementation ---
export const ChipImpl: React.FC<ChipPropsExt> = ({ label, ...rest }) => (
  <Chip label={label} {...rest} />
);

// --- Badge Implementation ---
export const BadgeImpl: React.FC<BadgePropsExt> = ({ child, children, badgeContent, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Badge badgeContent={badgeContent} {...rest}>
      {resolvedChild}
    </Badge>
  );
};

// --- Paper Implementation ---
export const PaperImpl: React.FC<PaperPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Paper {...rest}>
      {resolvedChild}
    </Paper>
  );
};

// --- DatePicker Implementation ---
export const DatePickerImpl: React.FC<DatePickerPropsExt> = ({ label, ...rest }) => (
  <TextField label={label} type="date" InputLabelProps={{ shrink: true }} {...rest} />
);

// --- Slider Implementation ---
export const SliderImpl: React.FC<SliderPropsExt> = (props) => (
  <Slider {...props} />
);

// --- Radio Implementation ---
export const RadioImpl: React.FC<RadioPropsExt> = (props) => (
  <FormControlLabel {...props} />
);

// --- Switch Implementation ---
export const SwitchImpl: React.FC<SwitchPropsExt> = (props) => (
  <FormControlLabel {...props} />
);

// --- Fab Implementation ---
export const FabImpl: React.FC<FabPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Fab {...rest}>
      {resolvedChild}
    </Fab>
  );
};

// --- Tooltip Implementation ---
export const TooltipImpl: React.FC<TooltipPropsExt> = ({ child, children, title, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Tooltip title={title} {...rest}>
      <span>{resolvedChild}</span>
    </Tooltip>
  );
};

// --- Autocomplete Implementation ---
export const AutocompleteImpl: React.FC<AutocompletePropsExt> = ({ options, label, renderInput, ...rest }) => (
  <Autocomplete
    options={options}
    renderInput={renderInput || ((params) => <TextField {...params} label={label} />)}
    {...rest}
  />
);

// --- Pagination Implementation ---
export const PaginationImpl: React.FC<PaginationPropsExt> = (props) => (
  <Pagination {...props} />
);

// --- Breadcrumbs Implementation ---
export const BreadcrumbsImpl: React.FC<BreadcrumbsPropsExt> = ({ items, ...rest }) => (
  <Breadcrumbs {...rest}>
    {items.map((item, index) => (
      item.href ? (
        <Link key={index} href={item.href}>
          {item.label}
        </Link>
      ) : (
        <Typography key={index}>{item.label}</Typography>
      )
    ))}
  </Breadcrumbs>
);

// --- SpeedDial Implementation ---
export const SpeedDialImpl: React.FC<SpeedDialPropsExt> = ({ actions, ...rest }) => (
  <SpeedDial
    icon={<SpeedDialIcon />}
    {...rest}
  >
    {actions.map((action, index) => (
      <SpeedDialAction
        key={index}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.onClick}
      />
    ))}
  </SpeedDial>
);

// --- Drawer Implementation ---
export const DrawerImpl: React.FC<DrawerPropsExt> = ({ child, children, open, onClose, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <Drawer open={open} onClose={onClose} {...rest}>
      {resolvedChild}
    </Drawer>
  );
};

// --- AppBar Implementation ---
export const AppBarImpl: React.FC<AppBarPropsExt> = ({ child, children, ...rest }) => {
  const resolvedChild = resolveChild(child) ?? children;
  return (
    <AppBar {...rest}>
      {resolvedChild}
    </AppBar>
  );
};

// --- DataGrid Implementation ---
export const DataGridImpl: React.FC<DataGridPropsExt> = ({
  columns,
  rows,
  pageSize = 10,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onSortModelChange,
  loading = false,
  checkboxSelection = false,
  onSelectionModelChange,
  height,
  stickyHeader = false,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [selected, setSelected] = useState<any[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (onSortModelChange) {
      onSortModelChange([{ field: property, sort: isAsc ? 'desc' : 'asc' }]);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      if (onSelectionModelChange) onSelectionModelChange(newSelected);
      return;
    }
    setSelected([]);
    if (onSelectionModelChange) onSelectionModelChange([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    if (onSelectionModelChange) onSelectionModelChange(newSelected);
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  const sortedRows = React.useMemo(() => {
    if (!orderBy) return rows;
    return [...rows].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [rows, order, orderBy]);

  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', height: height || '100%' }}>
      <TableContainer sx={{ 
        flex: 1, 
        overflow: 'auto',
        maxHeight: stickyHeader ? (height || '100%') : undefined
      }}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {checkboxSelection && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.field} style={{ width: column.width }}>
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={() => handleRequestSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (checkboxSelection ? 1 : 0)}>
                  <Skeleton variant="rectangular" height={50} />
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    key={row.id || index}
                    hover
                    onClick={(event) => checkboxSelection && handleClick(event, row.id)}
                    role={checkboxSelection ? "checkbox" : undefined}
                    aria-checked={checkboxSelection ? isItemSelected : undefined}
                    selected={isItemSelected}
                  >
                    {checkboxSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.field}>
                        {column.renderCell ? column.renderCell({ value: row[column.field], row }) : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ flexShrink: 0 }}
      />
    </Paper>
  );
};