import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import type { ReactElement } from 'react'

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.heroGlow};
  padding: ${theme.spacing.xl};
`

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${theme.fontSizes['5xl']};
  color: ${theme.colors.text.dimWhite};
  margin-bottom: ${theme.spacing.md};
  font-weight: 300;

  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const StatCard = styled(motion.div)`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  backdrop-filter: blur(10px);

  h3 {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text.lightGold};
    margin-bottom: ${theme.spacing.xs};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: bold;
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const FiltersBar = styled.div`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  align-items: center;
`

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
  }

  option {
    background: ${theme.colors.background.black};
  }
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${theme.animation.duration.fast} ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

const TableContainer = styled.div`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  backdrop-filter: blur(10px);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: ${theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  }

  th {
    background: rgba(255, 215, 0, 0.05);
    color: ${theme.colors.primary.gold};
    font-weight: 600;
    text-transform: uppercase;
    font-size: ${theme.fontSizes.sm};
    letter-spacing: 1px;
  }

  td {
    color: ${theme.colors.text.lightWhite};
    font-size: ${theme.fontSizes.base};
  }

  tr:hover td {
    background: rgba(255, 215, 0, 0.03);
  }
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'pending': return 'rgba(251, 191, 36, 0.2)'
      case 'confirmed': return 'rgba(74, 222, 128, 0.2)'
      case 'completed': return 'rgba(147, 51, 234, 0.2)'
      default: return 'rgba(156, 163, 175, 0.2)'
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#fbbf24'
      case 'confirmed': return '#4ade80'
      case 'completed': return '#9333ea'
      default: return '#9ca3af'
    }
  }};
`

const PlanBadge = styled.span<{ plan: string }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${props => {
    switch (props.plan) {
      case 'despertar': return 'rgba(59, 130, 246, 0.2)'
      case 'metamorfosis': return 'rgba(255, 215, 0, 0.2)'
      case 'infinito': return 'rgba(147, 51, 234, 0.2)'
      default: return 'rgba(156, 163, 175, 0.2)'
    }
  }};
  color: ${props => {
    switch (props.plan) {
      case 'despertar': return '#3b82f6'
      case 'metamorfosis': return '#ffd700'
      case 'infinito': return '#9333ea'
      default: return '#9ca3af'
    }
  }};
  text-transform: capitalize;
`

interface Inscripcion {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  pais: string
  plan: string
  disponibilidad: string
  fecha: string
  status: string
}

export default function AdminInscripciones() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([])
  const [filteredInscripciones, setFilteredInscripciones] = useState<Inscripcion[]>([])
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInscripciones()
  }, [])

  useEffect(() => {
    filterInscripciones()
  }, [inscripciones, filterPlan, filterStatus, searchTerm])

  const fetchInscripciones = async () => {
    try {
      const response = await fetch('/api/inscripciones/list')
      if (!response.ok) {
        throw new Error('Error al cargar inscripciones')
      }
      const data = await response.json()
      setInscripciones(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching inscripciones:', error)
      setLoading(false)
    }
  }

  const filterInscripciones = () => {
    let filtered = [...inscripciones]

    if (filterPlan !== 'all') {
      filtered = filtered.filter(i => i.plan === filterPlan)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(i => i.status === filterStatus)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(i =>
        i.nombre.toLowerCase().includes(term) ||
        i.apellido.toLowerCase().includes(term) ||
        i.email.toLowerCase().includes(term) ||
        i.pais.toLowerCase().includes(term)
      )
    }

    setFilteredInscripciones(filtered)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'País', 'Plan', 'Disponibilidad', 'Fecha', 'Status']
    const rows = filteredInscripciones.map(i => [
      i.id,
      i.nombre,
      i.apellido,
      i.email,
      i.telefono,
      i.pais,
      i.plan,
      i.disponibilidad,
      new Date(i.fecha).toLocaleString(),
      i.status
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscripciones-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const stats = {
    total: inscripciones.length,
    pending: inscripciones.filter(i => i.status === 'pending').length,
    confirmed: inscripciones.filter(i => i.status === 'confirmed').length,
    completed: inscripciones.filter(i => i.status === 'completed').length,
    despertar: inscripciones.filter(i => i.plan === 'despertar').length,
    metamorfosis: inscripciones.filter(i => i.plan === 'metamorfosis').length,
    infinito: inscripciones.filter(i => i.plan === 'infinito').length
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>
            Panel de <strong>Inscripciones</strong>
          </Title>
        </Header>

        <StatsGrid>
          <StatCard whileHover={{ scale: 1.02 }}>
            <h3>Total Inscripciones</h3>
            <p>{stats.total}</p>
          </StatCard>

          <StatCard whileHover={{ scale: 1.02 }}>
            <h3>Pendientes</h3>
            <p>{stats.pending}</p>
          </StatCard>

          <StatCard whileHover={{ scale: 1.02 }}>
            <h3>Confirmadas</h3>
            <p>{stats.confirmed}</p>
          </StatCard>

          <StatCard whileHover={{ scale: 1.02 }}>
            <h3>Completadas</h3>
            <p>{stats.completed}</p>
          </StatCard>
        </StatsGrid>

        <FiltersBar>
          <SearchInput
            type="text"
            placeholder="Buscar por nombre, email o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)}>
            <option value="all">Todos los planes</option>
            <option value="despertar">Despertar ({stats.despertar})</option>
            <option value="metamorfosis">Metamorfosis ({stats.metamorfosis})</option>
            <option value="infinito">Infinito ({stats.infinito})</option>
          </Select>

          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmado</option>
            <option value="completed">Completado</option>
          </Select>

          <Button onClick={exportToCSV}>
            Exportar CSV
          </Button>
        </FiltersBar>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>País</th>
                <th>Plan</th>
                <th>Disponibilidad</th>
                <th>Fecha</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                    Cargando inscripciones...
                  </td>
                </tr>
              ) : filteredInscripciones.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                    No hay inscripciones que mostrar
                  </td>
                </tr>
              ) : (
                filteredInscripciones.map((inscripcion) => (
                  <tr key={inscripcion.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: theme.fontSizes.sm }}>
                      {inscripcion.id}
                    </td>
                    <td>{inscripcion.nombre} {inscripcion.apellido}</td>
                    <td>{inscripcion.email}</td>
                    <td>{inscripcion.pais}</td>
                    <td>
                      <PlanBadge plan={inscripcion.plan}>
                        {inscripcion.plan}
                      </PlanBadge>
                    </td>
                    <td>{inscripcion.disponibilidad}</td>
                    <td>{new Date(inscripcion.fecha).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={inscripcion.status}>
                        {inscripcion.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Container>
    </PageContainer>
  )
}

// Custom layout (sin Navigation)
AdminInscripciones.getLayout = function getLayout(page: ReactElement) {
  return page
}