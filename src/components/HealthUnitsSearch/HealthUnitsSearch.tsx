import { useState, useEffect } from 'react';
import { fetchHealthUnits, fetchMunicipios } from '../../api';
import GoogleMap from "../Googlemap";
import MessageModal from "../MessageModal";
import styles from './HealthUnitsSearch.module.css';

interface HealthUnit {
    id: string;
    displayName?: {
        text: string;
    };
    formattedAddress?: string;
    nationalPhoneNumber?: string;
}

interface HealthUnitSearchProps {
    onClose?: () => void;
}

const HealthUnitsSearch = ({ onClose }: HealthUnitSearchProps) => {
    const [category, setCategory] = useState<string>('');
    const [municipio, setMunicipio] = useState<string>('todos');
    const [municipios, setMunicipios] = useState<string[]>([]);
    const [healthUnits, setHealthUnits] = useState<Record<string, HealthUnit[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedDestination, setSelectedDestination] = useState<{
        place_id: string;
        name: string;
        formatted_address: string;
    } | null>(null);
    const [totalResults, setTotalResults] = useState<number>(0);

    useEffect(() => {
        if (!onClose) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const showMessageModal = (message: string) => {
        setModalMessage(message);
        setShowModal(true);
    };

    const populateMunicipios = async () => {
        try {
            const municipiosData = await fetchMunicipios();
            setMunicipios(municipiosData.sort());
        } catch (e) {
            showMessageModal("");
        }
    };

    const fetchUnits = async () => {
        if (!category) {
            return;
        }
        setLoading(true);
        try {
            const dataByMunicipality = await fetchHealthUnits(category, municipio);
            setHealthUnits(dataByMunicipality);
            const total = (Object.values(dataByMunicipality) as HealthUnit[][])
                .reduce((sum, unitsArray) => sum + unitsArray.length, 0);
            setTotalResults(total);
        } catch (e) {
            console.error("Erro ao buscar unidades:", e);
            showMessageModal("Ocorreu um erro ao buscar os dados.");
            setHealthUnits({});
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    };

    const handleTraceRoute = (unit: HealthUnit) => {
        setSelectedDestination({
            place_id: unit.id,
            name: unit.displayName?.text || "Nome não disponível",
            formatted_address: unit.formattedAddress || "Não informado",
        });
    };

    useEffect(() => {
        populateMunicipios();
    }, []);

    useEffect(() => {
        if (category) {
            fetchUnits();
        }
    }, [category, municipio]);

    const renderResults = () => {
        if (loading) {
            return (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Buscando unidades...</p>
                </div>
            );
        }

        if (!category) {
            return (
                <div className={styles.emptyState}>
                    <p>Selecione uma categoria para começar.</p>
                </div>
            );
        }

        if (Object.keys(healthUnits).length === 0) {
            return (
                <div className={styles.emptyState}>
                    <p>Nenhuma unidade encontrada.</p>
                </div>
            );
        }

        return (
            <div className={styles.resultsContainer}>
                <div className={styles.totalResults}>
                    <p>Total: {totalResults} unidades</p>
                </div>
                {Object.keys(healthUnits).map((municipioName) => (
                    <div key={municipioName} className={styles.municipioSection}>
                        <h2 className={styles.municipioTitle}>{municipioName}</h2>
                        {healthUnits[municipioName].map((unit) => (
                            <div key={unit.id} className={styles.unitCard}>
                                <h3 className={styles.unitName}>{unit.displayName?.text || "Unidade de Saúde"}</h3>
                                <p className={styles.unitAddress}>{unit.formattedAddress || "Endereço não disponível"}</p>
                                {unit.nationalPhoneNumber && (
                                    <p className={styles.unitPhone}>Telefone: {unit.nationalPhoneNumber}</p>
                                )}
                                <button
                                    onClick={() => handleTraceRoute(unit)}
                                    className={styles.routeButton}>
                                    Traçar Rota
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.consultaContainer}>
            {onClose && (
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Fechar busca de unidades de saúde"
                    title="Fechar">
                    X
                </button>
            )}
            <div className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category-select" className={styles.formLabel}>
                            Selecione a Categoria:
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.formSelect}
                            id="category-select">
                            <option value="">Selecione uma categoria</option>
                            <option value="Clínica Geral">Clínica Geral</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Farmácia">Farmácia</option>
                            <option value="Posto de Saúde">Posto de Saúde</option>
                            <option value="Laboratório">Laboratório</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="municipio-select" className={styles.formLabel}>
                            Selecione o Município:
                        </label>
                        <select
                            id="municipio-select"
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                            className={styles.formSelect}>
                            <option value="todos">Todos</option>
                            {municipios.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.resultsSection}>
                    {renderResults()}
                </div>
                <GoogleMap
                    destination={selectedDestination}
                    onRouteCleared={() => setSelectedDestination(null)}
                    showMessage={showMessageModal}/>   
            </div>
            <MessageModal
                message={modalMessage}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <section className={styles.footerSection}>
                <footer className={styles.footer}>
                    <div className={styles.footerLogos}>
                        <img src="/images/inova.png" alt="Logo INOVA" className={styles.footerLogo} />
                        <img src="/images/icon2.png" alt="Logo Governo" className={styles.footerLogo} />
                        <img src="/images/secti.png" alt="Logo SECTI" className={styles.footerLogo} />
                    </div>
                    <div className={styles.footerContact}>Contato: buscasusgp2@gmail.com</div>
                </footer>
            </section>
        </div>
    );
};

export default HealthUnitsSearch;